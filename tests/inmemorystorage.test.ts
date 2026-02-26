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

    test('findById() method throws an error if match does not exist', () => {
        const storage = new InMemoryStorage();
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        storage.save(match);
        expect(() => storage.findById('m2')).toThrow();
    })

    test('save() replaces the existing match if id is the same', () => {
        const storage = new InMemoryStorage();
        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        storage.save(match1);
        expect(storage.findAll()).toEqual([match1]);

        const match2 = new Match('m1', new Team('Home'), new Team('Away'));
        storage.save(match2);
        expect(storage.findAll()).toEqual([match2]);
    })

    test('save() keeps all distinct matches and findAll returns all of them', () => {
        const storage = new InMemoryStorage();
        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));
        storage.save(match1);
        storage.save(match2);
        expect(storage.findAll()).toEqual([match1, match2]);
    })

    test('delete() method removes match by id and returns the deleted match ', () => {
        const storage = new InMemoryStorage();
        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));
        storage.save(match1);
        storage.save(match2);
        expect(storage.delete('m1')).toBe(match1);
        expect(storage.findAll()).toEqual([match2]);
    })

    test('delete() method throws an error if desired match not found', () => {
        const storage = new InMemoryStorage();
        const match = new Match('m1', new Team('Home'), new Team('Away'));
        storage.save(match);
        expect(() => storage.delete('m2')).toThrow();
    })

    test('clearAll() method removes everything', () => {
        const storage = new InMemoryStorage();
        const match1 = new Match('m1', new Team('Home'), new Team('Away'));
        const match2 = new Match('m2', new Team('Home'), new Team('Away'));
        storage.save(match1);
        storage.save(match2);
        expect(storage.findAll()).toEqual([match1, match2]);

        storage.clearAll();
        expect(storage.findAll()).toEqual([]);
    })
})