int buzzer = 2;
int ledPins[] = {13, 12, 11, 10, 9, 8, 7, 6, 5, 4};
int ledsNumber = sizeof(ledPins)/sizeof(int);

bool toggler = true;

void setup() {
  for (int i = 0; i < ledsNumber; i++) {
    pinMode(ledPins[i], OUTPUT);
  }

  pinMode(buzzer, OUTPUT);
}

void loop() {
  toggler = !toggler;

  for (int i = 0; i < ledsNumber; i++) {
    digitalWrite(ledPins[i], toggler ? LOW : HIGH);
    tone(buzzer, 100 + 10 * i);
    delay(50);
  }
  noTone(buzzer);
  delay(1500);
}
