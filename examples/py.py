#!/usr/bin/env python3

import argparse
import datetime from date
import os
import os.path
from datetime import date

parser = argparse.ArgumentParser()
parser.add_argument("issue_date", help="'YYYY_MM_DD', e.g.: '2018_10_08'")
args = parser.parse_args()

dt = datetime.strptime(args.issue_date, '%Y_%m_%d')
d = dt.date()

server_base_paths = {
  "imaging":      "/Volumes/TNYImage/Imaging",
  "makeup_inbox": "/Volumes/TNY/Edit/Share/Editorial/Makeup In Box/_INBOX_ART_PHOTO",
  "condenet":     "/Volumes/TNY/Edit/Groups/Web/CondeNet",
  "npp_images":   "/Volumes/TNY/Edit/Groups/Web/CondeNet/NPP Images"
}

symlink_map = {
  "01-ART-TRANSFER": {
    "pubworx": [
      server_base_paths["imaging"],
      "_Pubworx-Inbox",
      "{d:%Y_%m_%d}".format(d=d)
    ],
    "makeup": [
      server_base_paths["makeup_inbox"],
      "{d:%Y-%m-%d}".format(d=d)
    ]
  },
  "02-ART-STG": {
    "resize-out-2560": [
      server_base_paths["npp_images"],
      "Resize_Out",
      "{d:%Y}".format(d=d),
      "{d:%m}".format(d=d),
      "{d:%d}".format(d=d),
      "resize_out_de",
      "2560"
    ],
    "working-tablet": [
      server_base_paths["imaging"],
      "_WorkingTablet",
      "{d:%Y_%m_%d}".format(d=d)
    ],
    "Resize_in_{d:%Y_%m_%d}".format(d=d): [
      server_base_paths["npp_images"],
      "Resize_in_{d:%Y_%m_%d}.app".format(d=d)
    ]
  },
  "04-XML": {
    "{d:%y-%m-%d}-CONDENET".format(d=d): [
      server_base_paths["condenet"],
      "{d:%y-%m-%d}".format(d=d)
    ]
  },
  "05-LAYOUTS": {
    "pdf-archive": [
      "/",
      "Volumes",
      "TNYImage",
      "PDF Archive",
      "{d:%Y}".format(d=d),
      "{d:%Y_%m_%d}".format(d=d),
    ],
    "working-hi-res": [
      server_base_paths["imaging"],
      "_WorkingHiRes",
      "{d:%Y_%m_%d}".format(d=d)
    ]
  }
}

for folder, subfolders in symlink_map.items():
  for subfolder, src_parts in subfolders.items():
    src = os.path.join(*src_parts)
    dst = os.path.join(os.path.expanduser("~"), "Desktop", folder, subfolder)
    if (os.path.exists(src) and os.path.isdir(src)):
      if (os.path.lexists(dst) and os.path.islink(dst)):
        print("remove: {}".format(dst))
        os.remove(dst)
      os.symlink(src, dst)


today = date.today()
ZERO = timedelta(0)

class LocalTimezone(tzinfo):
  def fromutc(self, dt):
    assert dt.tzinfo is self
    stamp = (dt - datetime(1970, 1, 1, tzinfo=self)) // SECOND
    args = _time.localtime(stamp)[:6]
    dst_diff = DSTDIFF // SECOND
    # Detect fold
    fold = (args == _time.localtime(stamp - dst_diff))
    return datetime(*args, microsecond=dt.microsecond,
                    tzinfo=self, fold=fold)

  def utcoffset(self, dt):
    if self._isdst(dt):
      return DSTOFFSET
    else:
      return STDOFFSET

  def dst(self, dt):
    if self._isdst(dt):
      return DSTDIFF
    else:
      return ZERO

  def tzname(self, dt):
    return _time.tzname[self._isdst(dt)]

  def _isdst(self, dt):
    tt = (dt.year, dt.month, dt.day,
          dt.hour, dt.minute, dt.second,
          dt.weekday(), 0, 0)
    stamp = _time.mktime(tt)
    tt = _time.localtime(stamp)
    return tt.tm_isdst > 0
