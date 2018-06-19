#include <Arduino.h>
#include "algorithm.h"
#include "max30102.h"
#include "Adafruit_NeoPixel.h"

#define BRIGHTNESS_DIVISOR 8  //to lower the max brightness of the neopixel LED
Adafruit_NeoPixel LED = Adafruit_NeoPixel(1, 8, NEO_GRB + NEO_KHZ800);
#define MAX_BRIGHTNESS 255


uint32_t aun_ir_buffer [ 100 ]; //红外LED传感器数据
uint32_t aun_red_buffer [ 100 ]; //红色LED传感器数据
int32_t n_ir_buffer_length; //数据长度
int32_t n_spo2;   // SPO2值
int8_t ch_spo2_valid;  //指示器显示SPO2计算是否有效
int32_t n_heart_rate; //心率值
int8_t  ch_hr_valid;  //指示器显示心率计算是否有效
uint8_t uch_dummy;


//当您按下reset时，安装例程会运行一次：
void setup() {
    LED.begin();
    LED.show();

  maxim_max30102_reset(); //重置MAX30102
   //以115200位/秒的速率初始化串行通信：
  Serial.begin(115200);
  pinMode(10, INPUT);  // D10引脚连接至MAX30102的中断输出引脚
  delay(1000);
  maxim_max30102_read_reg(REG_INTR_STATUS_1,&uch_dummy); //读取/清除中断状态寄存器
  while(Serial.available()==0) //等待直到用户按下一个键
  {
    Serial.write(27);      // ESC命令
    Serial.print(F("[2J"));   //清除屏幕命令
    Serial.println(F("Adafruit Flora"));
    Serial.println(F("Press any key to start conversion"));
    delay(1000);
  }
  uch_dummy=Serial.read();
  maxim_max30102_init(); //初始化MAX30102
}


void loop() {
  uint32_t un_min, un_max, un_prev_data, un_brightness;  //变量来计算反映心跳的板载LED亮度
  int32_t i;
  float f_temp;
  
  un_brightness=0;
  un_min=0x3FFFF;
  un_max=0;
  
  n_ir_buffer_length=100; // 100个缓冲区的长度为4秒，样本以25sps运行

  //读取前100个采样，并确定信号范围
  for(i=0;i<n_ir_buffer_length;i++)
  {
    while(digitalRead(10)==1);   //等到中断引脚置位
    maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i)); //从MAX30102 FIFO读取
    
    if(un_min>aun_red_buffer[i])
      un_min=aun_red_buffer[i];  //更新信号最小值
    if(un_max<aun_red_buffer[i])
      un_max=aun_red_buffer[i];   //更新信号最大值
    Serial.print(F("red="));
    Serial.print(aun_red_buffer[i], DEC);
    Serial.print(F(", ir="));
    Serial.println(aun_ir_buffer[i], DEC);
  }
  un_prev_data=aun_red_buffer[i];
 //计算前100个样本（样本的前4秒）后的心率和SpO2
  maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_spo2, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 

  //连续从MAX30102取样心率和SpO2每1秒计算一次
  while(1)
  {
    i=0;
    un_min=0x3FFFF;
    un_max=0;

    //将前25组样本转储到内存中，并将最后的75组样本移至顶部
    for(i=25;i<100;i++)
    {
      aun_red_buffer[i-25]=aun_red_buffer[i];
      aun_ir_buffer[i-25]=aun_ir_buffer[i];

     //更新最小和最大信号
      if(un_min>aun_red_buffer[i])
        un_min=aun_red_buffer[i];
      if(un_max<aun_red_buffer[i])
        un_max=aun_red_buffer[i];
    }

    //计算心率前先取25组样本
    for(i=75;i<100;i++)
    {
      un_prev_data=aun_red_buffer[i-1];
      while(digitalRead(10)==1);
      digitalWrite(9, !digitalRead(9));
      maxim_max30102_read_fifo((aun_red_buffer+i), (aun_ir_buffer+i));

      //计算LED的亮度
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
      LED.setPixelColor(0, un_brightness/BRIGHTNESS_DIVISOR, 0, 0);
      LED.show();
       //通过UART向终端程序发送采样和计算结果
      Serial.print(F("red="));
      Serial.print(aun_red_buffer[i], DEC);
      Serial.print(F(", ir="));
      Serial.print(aun_ir_buffer[i], DEC);
      
      Serial.print(F(", HR="));
      Serial.print(n_heart_rate, DEC);
      
      Serial.print(F(", HRvalid="));
      Serial.print(ch_hr_valid, DEC);
      
      Serial.print(F(", SPO2="));
      Serial.print(n_spo2, DEC);

      Serial.print(F(", SPO2Valid="));
      Serial.println(ch_spo2_valid, DEC);
    }
    maxim_heart_rate_and_oxygen_saturation(aun_ir_buffer, n_ir_buffer_length, aun_red_buffer, &n_spo2, &ch_spo2_valid, &n_heart_rate, &ch_hr_valid); 
  }
}