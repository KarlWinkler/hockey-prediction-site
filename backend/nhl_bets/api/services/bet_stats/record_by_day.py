from .win_percent import WinPercent
from django.utils import timezone
from ..date_service import DateService

class RecordByDay:
    def __init__(self, user_id, start_date, end_date):

        self.user_id = user_id
        self.start_date = start_date
        self.end_date = end_date
        base = self.end_date
        print(f'base: {self.end_date.date()}')
        numdays = (self.end_date - self.start_date).days + 1
        date_list = [base - timezone.timedelta(days=x) for x in range(numdays)]
        self.win_percents = [WinPercent(user_id, DateService(date).start_of_day(), DateService(date).end_of_day()) for date in date_list]

    def __str__(self):
        return f'Record By Day: {self.win_percents}'

    def toJSON(self):
        return {
            'user_id': self.user_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'win_percents': [win_percent.toJSON() for win_percent in self.win_percents],
        }