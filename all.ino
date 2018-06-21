#include <Arduino.h>
#include "algorithm.h"
#include "max30102.h"
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_TMP006.h"
//if Adafruit Flora development board is chosen, include NeoPixel library and define an NeoPixel object

#include "Adafruit_NeoPixel.h"

Adafruit_TMP006 tmp006;
#define BRIGHTNESS_DIVISOR 8  //to lower the max brightness of the neopixel LED
Adafruit_NeoPixel LED = Adafruit_NeoPixel(1, 8, NEO_GRB + NEO_KHZ800);

#define MAX_BRIGHTNESS 255


uint32_t aun_ir_buffer[100]; //infrared LED sensor data
uint32_t aun_red_buffer[100];  //red LED sensor data
int32_t n_ir_buffer_length; //data length
int32_t n_spo2;  //SPO2 value
int8_t ch_spo2_valid;  //indicator to show if the SPO2 calculation is valid
int32_t n_heart_rate; //heart rate value
int8_t  ch_hr_valid;  //indicator to show if the heart rate calculation is valid
uint8_t uch_dummy;

// the setup routine runs once when you press reset:
void setup() {
  #if defined(ARDUINO_AVR_FLORA8)
  //Initialize the LED
  LED.begin();
  LED.show();
  #endif
  maxim_max30102_reset(); //resets the MAX30102
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  pinMode(10, INPUT);  //pin D10 connects to the interrupt output pin of the MAX30102
  delay(1000);
  tmp006.begin(TMP006_CFG_1SAMPLE);
  maxim_max30102_read_reg(REG_INTR_STATUS_1,&uch_dummy);  //Reads/clears the interrupt status register
  while(Serial.available()==0)  //wait until user presses a key
  {
    Serial.write(27);       // ESC command   
  #if defined(ARDUINO_AVR_FLORA8)
    Serial.println(F("Adafruit Flora"));
  #endif
    Serial.println(F("Press any key to start conversion"));
    delay(1000);
  }
  uch_dummy=Serial.read();
  maxim_max30102_init();  //initialize the MAX30102
}

// the loop routine runs over and over again forever:
void loop() {
  uint32_t un_min, un_max, un_prev_data, un_brightness;  //variables to calculate the on-board LED brightness that reflects the heartbeats
  int32_t i;
  float f_temp;
  tmp006.wake();
  float objt = tmp006.readObjTempC();
  float diet = tmp006.readDieTempC();
  un_brightness=0;
  un_min=0x3FFFF;
  un_max=0;
  
  n_ir_buffer_length=100;  //buffer length of 100 stores 4 seconds of samples running at 25sps

  //read the first 100 samples, and determine the signal range
  for(i=0;i<n_ir_buffer_length;i++)
  {
    // while(digitalRead(10)==1);  //wait until the interrupt pin asserts
    maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i));  //read from MAX30102 FIFO

    if(un_min>aun_red_buffer[i])
      un_min=aun_red_buffer[i];  //update signal min
    if(un_max<aun_red_buffer[i])
      un_max=aun_red_buffer[i];  //update signal max
  }
   un_prev_data=aun_red_buffer[i];
  //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
  maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_spo2, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 
  //Continuously taking samples from MAX30102.  Heart rate and SpO2 are calculated every 1 second
  
    i=0;
    un_min=0x3FFFF;
    un_max=0;

    //dumping the first 25 sets of samples in the memory and shift the last 75 sets of samples to the top
    for(i=25;i<100;i++)
    {
      aun_red_buffer[i-25]=aun_red_buffer[i];
      aun_ir_buffer[i-25]=aun_ir_buffer[i];

      //update the signal min and max
      if(un_min>aun_red_buffer[i])
        un_min=aun_red_buffer[i];
      if(un_max<aun_red_buffer[i])
        un_max=aun_red_buffer[i];
    }

    //take 25 sets of samples before calculating the heart rate.
    for(i=75;i<100;i++)
    {
    
      un_prev_data=aun_red_buffer[i-1];

      // while(digitalRead(10)==1);
      // digitalWrite(9, !digitalRead(9));
      maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i));

      //calculate the brightness of the LED
      if(aun_red_buffer[i]>un_prev_data)
      {
        f_temp=aun_red_buffer[i]-un_prev_data;
        f_temp/=(un_max-un_min);
        f_temp*=MAX_BRIGHTNESS;
        f_temp=un_brightness-f_temp;
        if(f_temp<0)
          un_brightness=0;
        else
          un_brightness=(int)f_temp;
      }
      else
      {
        f_temp=un_prev_data-aun_red_buffer[i];
        f_temp/=(un_max-un_min);
        f_temp*=MAX_BRIGHTNESS;
        un_brightness+=(int)f_temp;
        if(un_brightness>MAX_BRIGHTNESS)
          un_brightness=MAX_BRIGHTNESS;
      }

      #if defined(ARDUINO_AVR_FLORA8)
          LED.setPixelColor(0, un_brightness/BRIGHTNESS_DIVISOR, 0, 0);
          LED.show();
      #endif 
    }
    maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_spo2, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 
    
    Serial.print(n_heart_rate, DEC);
    Serial.print(','）;
    Serial.println(diet); 
    // Serial.print(F("HR="));
    // Serial.print("Object Temperature: "); Serial.print(objt); Serial.print("*C");
    // Serial.println("Die Temperature: ");
    //  Serial.print(diet); 
    //  Serial.println("*C");
    delay(3000);
      
}