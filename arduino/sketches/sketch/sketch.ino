int LED_GREEN = 2;
int LED_ORANGE = 3;
int LED_RED = 4;

int BUZZER = 7;

int MAX_EMERGENCY = 10;
int emergency = 0;




void setup()
{
  Serial.begin(9600);
  Serial.setTimeout(10);
  
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_ORANGE, OUTPUT);
  pinMode(LED_RED, OUTPUT);

  pinMode(BUZZER, OUTPUT);

  ledDisplay();
}

void loop()
{
  if (Serial.available() > 0)
  {
    Serial.println("available");
    Serial.println(Serial.available());
    Serial.println("----");
  
    int value = Serial.parseInt();

    Serial.println("parseInt");
    Serial.println(Serial.parseInt());
    if (value < 0)
    {
      value = 0;
    }
    else if (value > MAX_EMERGENCY)
    {
      value = 10;
    }
  
   if(value != emergency)
   {
    emergency = value;
      Serial.println("emergency");
      Serial.println(emergency);
   }
  }
  
  ledDisplay();
  buzzDisplay();
}

void buzzDisplay()
{
  if(emergency < 5){
    return;
  }

  int soundDuration = (MAX_EMERGENCY - emergency + 1) * 80;
  tone(BUZZER, 2500, soundDuration);
  delay(soundDuration);
  if(emergency > 8){
    tone(BUZZER, 3500, soundDuration);
  }
  delay(soundDuration);
  noTone(BUZZER);
}

void ledDisplay()
{
  bool green = emergency < 7;
  bool red = emergency >= 10;
  digitalWrite(LED_GREEN, green);
  digitalWrite(LED_ORANGE, !green && !red);
  digitalWrite(LED_RED, red);
}
