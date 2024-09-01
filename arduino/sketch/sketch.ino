int BUZZER = 2;
int LED_PINS[] = {13, 12, 11, 10, 9, 8, 7, 6, 5, 4};
int LEDS_NUMBER = sizeof(LED_PINS) / sizeof(int);

int emergency = 5;

void setup()
{
	Serial.begin(9600);
	Serial.setTimeout(10);

	for (int i = 0; i < LEDS_NUMBER; i++)
	{
		pinMode(LED_PINS[i], OUTPUT);
	}
	pinMode(BUZZER, OUTPUT);

	Serial.println("pingback");
}

void loop()
{
	if (Serial.available() > 0)
	{
		int v = Serial.parseInt();
		if (v < 0)
		{
			v = 0;
		}
		if (v > 10)
		{
			v = 10;
		}

		emergency = v;
		Serial.println(emergency);
	}
	showAlertLevel();
}

void showAlertLevel()
{

	for (int i = 0; i < LEDS_NUMBER; i++)
	{
		digitalWrite(LED_PINS[i], i >= emergency ? LOW : HIGH);
	}

	if (emergency <= 5)
	{
		noTone(BUZZER);
		return;
	}

	tone(BUZZER, 2500, 100);
	delay(100);
	tone(BUZZER, 2000, 100);
	delay(100);
	noTone(BUZZER);
	delay((LEDS_NUMBER - emergency) * 250);
}
