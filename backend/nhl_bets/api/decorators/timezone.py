from django.utils import timezone
from backports import zoneinfo

def with_timezone(func):
  def set_timezone_wrapper(*args, **kwargs):
    tzname = args[0].headers.get('timezone')
    if tzname:
      timezone.activate(zoneinfo.ZoneInfo(tzname))
    return func(*args, **kwargs)
  return set_timezone_wrapper
