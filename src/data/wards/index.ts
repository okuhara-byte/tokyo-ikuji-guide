import { Benefit, WardKey } from '../types';
import { chiyoda } from './chiyoda';
import { chuo } from './chuo';
import { minato } from './minato';
import { shinjuku } from './shinjuku';
import { bunkyo } from './bunkyo';
import { taito } from './taito';
import { sumida } from './sumida';
import { koto } from './koto';
import { shinagawa } from './shinagawa';
import { meguro } from './meguro';
import { ota } from './ota';
import { setagaya } from './setagaya';
import { shibuya } from './shibuya';
import { nakano } from './nakano';
import { suginami } from './suginami';
import { toshima } from './toshima';
import { kita } from './kita';
import { arakawa } from './arakawa';
import { itabashi } from './itabashi';
import { nerima } from './nerima';
import { adachi } from './adachi';
import { katsushika } from './katsushika';
import { edogawa } from './edogawa';

export const WARD: Record<WardKey, Benefit[]> = {
  chiyoda,
  chuo,
  minato,
  shinjuku,
  bunkyo,
  taito,
  sumida,
  koto,
  shinagawa,
  meguro,
  ota,
  setagaya,
  shibuya,
  nakano,
  suginami,
  toshima,
  kita,
  arakawa,
  itabashi,
  nerima,
  adachi,
  katsushika,
  edogawa,
};
