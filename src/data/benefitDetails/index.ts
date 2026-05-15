import type { BenefitDetail } from './types';
import {
  N1_JIDO_TEATE,
  N2_SHUSSAN_IKUJI_ICHIJIKIN,
  N3_IKUJI_KYUGYO_KYUFU,
  N4_HOIKU_MUSHOKA,
  N5_BABY_SITTER,
} from './national';
import {
  M1_MARUKO,
  M2_MAMA_PAPA_HELPER,
  M3_PRIVATE_KINDERGARTEN,
  M4_ICHIJI_AZUKARI,
  M5_SANGO_CARE,
} from './metro';
import {
  F1_HOKEN_TEKIYO_FUNIN,
  F2_TOKUTEI_FUNIN_JOSEI,
  F3_TOKYO_FUNIN_KENSA,
  F4_TOKYO_DANSEI_FUNIN,
  F5_KIGYO_RYORITSU,
  F6_PIA_SODAN,
} from './fertility';
import {
  P1_OUEN_KOFUKIN,
  P2_NINPU_KENSHIN,
  P4_YURIKAGO_TOKYO,
} from './pregnancy';
import { B8_HOKEN_MENJO } from './birth';
import {
  WC1_BABYSITTER,
  WC2_HELPER,
  WC3_NINKAGAI_HOIKU,
  WC4_KENSHIN,
  WC5_KODOMO_IRYO,
} from './wards/chuo';
import { WCD1, WCD2, WCD3, WCD4, WCD5 } from './wards/chiyoda';
import { WM1, WM2, WM3, WM4, WM5 } from './wards/minato';
import { WSJ1, WSJ2, WSJ3, WSJ4, WSJ5 } from './wards/shinjuku';
import { WBK1, WBK2, WBK3, WBK4, WBK5 } from './wards/bunkyo';
import { WTT1, WTT2, WTT3, WTT4, WTT5 } from './wards/taito';
import { WSD1, WSD2, WSD3, WSD4, WSD5 } from './wards/sumida';
import { WKT1, WKT2, WKT3, WKT4, WKT5 } from './wards/koto';
import { WSG1, WSG2, WSG3, WSG4, WSG5 } from './wards/shinagawa';
import { WMG1, WMG2, WMG3, WMG4, WMG5 } from './wards/meguro';
import { WOT1, WOT2, WOT3, WOT4, WOT5 } from './wards/ota';
import { WST1, WST2, WST3, WST4, WST5 } from './wards/setagaya';
import { WSB1, WSB2, WSB3, WSB4, WSB5 } from './wards/shibuya';
import { WNK1, WNK2, WNK3, WNK4, WNK5 } from './wards/nakano';
import { WSA1, WSA2, WSA3, WSA4, WSA5 } from './wards/suginami';
import { WTS1, WTS2, WTS3, WTS4, WTS5 } from './wards/toshima';
import { WKI1, WKI2, WKI3, WKI4, WKI5 } from './wards/kita';
import { WAR1, WAR2, WAR3, WAR4, WAR5 } from './wards/arakawa';
import { WIB1, WIB2, WIB3, WIB4, WIB5 } from './wards/itabashi';
import { WNE1, WNE2, WNE3, WNE4, WNE5 } from './wards/nerima';
import { WAD1, WAD2, WAD3, WAD4, WAD5 } from './wards/adachi';
import { WKA1, WKA2, WKA3, WKA4, WKA5 } from './wards/katsushika';
import { WED1, WED2, WED3, WED4, WED5 } from './wards/edogawa';

export type {
  BenefitDetail,
  EligibilityOption,
  EligibilityQuestion,
  ApplicationStep,
} from './types';

export const BENEFIT_DETAILS: Record<string, BenefitDetail> = {
  // 国
  n1: N1_JIDO_TEATE,
  n2: N2_SHUSSAN_IKUJI_ICHIJIKIN,
  n3: N3_IKUJI_KYUGYO_KYUFU,
  n4: N4_HOIKU_MUSHOKA,
  n5: N5_BABY_SITTER,

  // 東京都
  m1: M1_MARUKO,
  m2: M2_MAMA_PAPA_HELPER,
  m3: M3_PRIVATE_KINDERGARTEN,
  m4: M4_ICHIJI_AZUKARI,
  m5: M5_SANGO_CARE,

  // 不妊治療フェーズ
  f1: F1_HOKEN_TEKIYO_FUNIN,
  f2: F2_TOKUTEI_FUNIN_JOSEI,
  f3: F3_TOKYO_FUNIN_KENSA,
  f4: F4_TOKYO_DANSEI_FUNIN,
  f5: F5_KIGYO_RYORITSU,
  f6: F6_PIA_SODAN,

  // 妊娠フェーズ
  p1: P1_OUEN_KOFUKIN,
  p2: P2_NINPU_KENSHIN,
  p4: P4_YURIKAGO_TOKYO,

  // 出産フェーズ
  b8: B8_HOKEN_MENJO,

  // 中央区
  wc1: WC1_BABYSITTER,
  wc2: WC2_HELPER,
  wc3: WC3_NINKAGAI_HOIKU,
  wc4: WC4_KENSHIN,
  wc5: WC5_KODOMO_IRYO,

  // 千代田区
  wcd1: WCD1, wcd2: WCD2, wcd3: WCD3, wcd4: WCD4, wcd5: WCD5,
  // 港区
  wm1: WM1, wm2: WM2, wm3: WM3, wm4: WM4, wm5: WM5,
  // 新宿区
  wsj1: WSJ1, wsj2: WSJ2, wsj3: WSJ3, wsj4: WSJ4, wsj5: WSJ5,
  // 文京区
  wbk1: WBK1, wbk2: WBK2, wbk3: WBK3, wbk4: WBK4, wbk5: WBK5,
  // 台東区
  wtt1: WTT1, wtt2: WTT2, wtt3: WTT3, wtt4: WTT4, wtt5: WTT5,
  // 墨田区
  wsd1: WSD1, wsd2: WSD2, wsd3: WSD3, wsd4: WSD4, wsd5: WSD5,
  // 江東区
  wkt1: WKT1, wkt2: WKT2, wkt3: WKT3, wkt4: WKT4, wkt5: WKT5,
  // 品川区
  wsg1: WSG1, wsg2: WSG2, wsg3: WSG3, wsg4: WSG4, wsg5: WSG5,
  // 目黒区
  wmg1: WMG1, wmg2: WMG2, wmg3: WMG3, wmg4: WMG4, wmg5: WMG5,
  // 大田区
  wot1: WOT1, wot2: WOT2, wot3: WOT3, wot4: WOT4, wot5: WOT5,
  // 世田谷区
  wst1: WST1, wst2: WST2, wst3: WST3, wst4: WST4, wst5: WST5,
  // 渋谷区
  wsb1: WSB1, wsb2: WSB2, wsb3: WSB3, wsb4: WSB4, wsb5: WSB5,
  // 中野区
  wnk1: WNK1, wnk2: WNK2, wnk3: WNK3, wnk4: WNK4, wnk5: WNK5,
  // 杉並区
  wsa1: WSA1, wsa2: WSA2, wsa3: WSA3, wsa4: WSA4, wsa5: WSA5,
  // 豊島区
  wts1: WTS1, wts2: WTS2, wts3: WTS3, wts4: WTS4, wts5: WTS5,
  // 北区
  wki1: WKI1, wki2: WKI2, wki3: WKI3, wki4: WKI4, wki5: WKI5,
  // 荒川区
  war1: WAR1, war2: WAR2, war3: WAR3, war4: WAR4, war5: WAR5,
  // 板橋区
  wib1: WIB1, wib2: WIB2, wib3: WIB3, wib4: WIB4, wib5: WIB5,
  // 練馬区
  wne1: WNE1, wne2: WNE2, wne3: WNE3, wne4: WNE4, wne5: WNE5,
  // 足立区
  wad1: WAD1, wad2: WAD2, wad3: WAD3, wad4: WAD4, wad5: WAD5,
  // 葛飾区
  wka1: WKA1, wka2: WKA2, wka3: WKA3, wka4: WKA4, wka5: WKA5,
  // 江戸川区
  wed1: WED1, wed2: WED2, wed3: WED3, wed4: WED4, wed5: WED5,

  // フェーズ別データの同一制度（エイリアス）
  b1: N2_SHUSSAN_IKUJI_ICHIJIKIN, // 出産育児一時金
  b2: P1_OUEN_KOFUKIN, // 出産・子育て応援交付金（5万円）→ 10万円プログラムの後半
  b3: N1_JIDO_TEATE, // 児童手当（出生後すぐ申請）
  b4: M1_MARUKO, // 子ども医療費助成
  b5: M2_MAMA_PAPA_HELPER, // ヘルパー派遣
  b6: N3_IKUJI_KYUGYO_KYUFU, // 育児休業給付金の受給
  b7: M5_SANGO_CARE, // 産後ケア事業
  p3: N2_SHUSSAN_IKUJI_ICHIJIKIN, // 出産育児一時金（妊娠中ステージ）
  p5: N3_IKUJI_KYUGYO_KYUFU, // 育児休業給付金（取得準備）
  p6: M5_SANGO_CARE, // 産後ケア事業（事前登録推奨）
};
