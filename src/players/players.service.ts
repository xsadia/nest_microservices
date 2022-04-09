import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Array<Player> = [];
  private readonly logger = new Logger(PlayersService.name);

  public async createUpdatePlayer({
    email,
    name,
    phoneNumber,
  }: CreatePlayerDTO): Promise<void> {
    this.logger.log(`createPlayerDTO: ${email} ${name} ${phoneNumber}`);
    const playerExists = await this.findByEmail(email);

    if (playerExists) {
      await this.update({ email, name, phoneNumber }, playerExists);

      return;
    }

    this.create({ email, name, phoneNumber });

    return;
  }

  public async findAll(): Promise<Array<Player>> {
    return this.players;
  }

  public async findByEmail(email: string): Promise<Player> {
    return this.players.find((player) => player.email === email);
  }

  private create({ email, name, phoneNumber }: CreatePlayerDTO): void {
    const player: Player = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      rank: 'A',
      rankPosition: 1,
      photoURL: null,
    };

    this.players.push(player);

    return;
  }

  private update(createPlayerDTO: CreatePlayerDTO, foundPlayer: Player): void {
    foundPlayer.name = createPlayerDTO.name;
  }
}
