export { Match } from './core/Match';
export { Team } from './core/Team';

export { IClock } from './core/interfaces/IClock';
export { IMatchRepository } from './core/interfaces/IMatchRepository';
export { IRankStrategy } from './core/interfaces/IRankStrategy';

export { InMemoryStorage } from './adapters/InMemoryStorage';
export { RankStrategy } from './adapters/RankStrategy';

import { Scoreboard } from './core/Scoreboard';

export default Scoreboard;