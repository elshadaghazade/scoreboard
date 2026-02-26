import { describe, test, expect, jest } from '@jest/globals';
import { InMemoryStorage } from '../src/adapters/InMemoryStorage';
import { Match } from '../src/core/Match';
import { Team } from '../src/core/Team';

describe('InMemoryStorage', () => {
    test('starts empty', () => {
        const storage = new InMemoryStorage();
        expect(storage.findAll()).toEqual([]);
    })

    test('save() method stores a match and findById() method returns it', () => {
        const storage = new InMemoryStorage();
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        storage.save(match);
        expect(storage.findById('m1')).toBe(match);
    })
})