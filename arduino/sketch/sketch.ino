int buzzer = 2;
int ledPins[] = {13, 12, 11, 10, 9, 8, 7, 6, 5, 4};
int ledsNumber = sizeof(ledPins)/sizeof(int);

int value = 0;

void setup() {
  Serial.begin(9600);
   Serial.setTimeout(10);
  
  for (int i = 0; i < ledsNumber; i++) {
    pinMode(ledPins[i], OUTPUT);
  }

  pinMode(buzzer, OUTPUT);
} 

void loop() {
  if (Serial.available() > 0) {
    String str = Serial.readString();
    str.trim();
    
    value = str.toInt();
    Serial.println(value);
    
  }

  for (int i = 0; i < ledsNumber; i++) {
      digitalWrite(ledPins[i], i >= value ? LOW : HIGH);
  }
}
