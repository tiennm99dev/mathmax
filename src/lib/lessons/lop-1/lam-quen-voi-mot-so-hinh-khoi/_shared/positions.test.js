import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  PLACE_NAMES,
  QUEUE,
  SCENES,
  askQuestion,
  commandText,
  fits,
  nextCommand,
  placeMessage,
} from './positions.js';

const scenes = Object.values(SCENES);

/** @param {{ x: number, size: number }} a @param {{ x: number, size: number }} b */
const leftOf = (a, b) => a.x + a.size <= b.x;

describe('position scenes', () => {
  it('has a place for every phrase and a name for every place', () => {
    const bad = [];
    for (const s of scenes) {
      for (const id of Object.keys(s.phrases)) {
        if (!s.places.some((p) => p.truths.includes(id))) bad.push(`${s.id} ${id}`);
      }
      for (const p of s.places) {
        if (!PLACE_NAMES[p.id]) bad.push(`${s.id} name ${p.id}`);
        for (const t of p.truths) if (!s.phrases[t]) bad.push(`${s.id} ${p.id} ${t}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps places apart and inside the picture', () => {
    const bad = [];
    for (const s of scenes) {
      for (const p of s.places) {
        if (p.x < 0 || p.y < 0 || p.x + p.size > 400 || p.y + p.size > 206) bad.push(p.id);
        for (const q of s.places) {
          if (p === q) continue;
          const apart = leftOf(p, q) || leftOf(q, p) || p.y + p.size <= q.y || q.y + q.size <= p.y;
          if (!apart) bad.push(`${p.id} ${q.id}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('puts the queue in door order: place 1, rabbit, place 3, cat, place 5', () => {
    const q = SCENES.hang.places;
    const spots = [q[0], { x: QUEUE[0].x, size: 60 }, q[1], { x: QUEUE[1].x, size: 60 }, q[2]];
    for (let i = 0; i + 1 < spots.length; i++) expect(leftOf(spots[i], spots[i + 1])).toBe(true);
    // In a queue to the door on the left, "trước" means nearer the door.
    expect(fits(SCENES.hang, 'cho-1', 'truoc-tho')).toBe(true);
    expect(fits(SCENES.hang, 'cho-3', 'truoc-tho')).toBe(false);
    expect(fits(SCENES.hang, 'cho-3', 'truoc-meo')).toBe(true);
    expect(fits(SCENES.hang, 'cho-5', 'sau-tho')).toBe(true);
  });

  it('reads left and right as the child sees the room', () => {
    expect(fits(SCENES.phong, 'canh-tu', 'trai-ban')).toBe(true);
    expect(fits(SCENES.phong, 'canh-cay', 'phai-ban')).toBe(true);
    expect(fits(SCENES.phong, 'canh-tu', 'phai-ban')).toBe(false);
  });

  it('asks questions with exactly one true option', () => {
    const bad = [];
    for (const s of scenes) {
      const rand = rng(7);
      let prev = null;
      for (let i = 0; i < 60; i++) {
        const q = askQuestion(s, rand, prev);
        const truths = q.options.filter((o) => fits(s, q.place, o));
        if (truths.length !== 1 || truths[0] !== q.options[q.answer]) bad.push(`${s.id} ${i}`);
        if (new Set(q.options).size !== 3 || q.place === prev) bad.push(`${s.id} ${i} repeat`);
        prev = q.place;
      }
    }
    expect(bad).toEqual([]);
  });

  it('never repeats a command and words the feedback', () => {
    const rand = rng(3);
    let prev = null;
    for (let i = 0; i < 30; i++) {
      const next = nextCommand(SCENES.phong, prev, rand);
      expect(next).not.toBe(prev);
      prev = next;
    }
    expect(commandText(SCENES.phong, 'duoi-ban')).toBe('Đặt quả bóng ở dưới cái bàn.');
    expect(commandText(SCENES.hang, 'sau-meo')).toBe('Cho gà con đứng sau con mèo.');
    expect(placeMessage(SCENES.phong, 'duoi-ban', 'duoi-ban')).toContain('Đúng rồi');
    expect(placeMessage(SCENES.phong, 'tren-ban', 'duoi-ban')).toBe(
      'Chưa đúng. Quả bóng đang ở trên cái bàn. Em tìm chỗ ở dưới cái bàn nhé.',
    );
  });
});
