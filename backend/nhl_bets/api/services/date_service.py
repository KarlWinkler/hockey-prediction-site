from django.utils import timezone
from backports import zoneinfo

class DateService:
    def __init__(self, date):
        self.date = date

    def start_of_day(self):
        return self.date.combine(self.date, self.date.min.time(), self.date.tzinfo)

    def end_of_day(self):
        return self.date.combine(self.date, self.date.max.time(), self.date.tzinfo)
