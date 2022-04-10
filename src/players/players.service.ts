import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    const playerExists = this.players.find((player) => player.email === email);

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
    const foundPlayer = this.players.find((player) => player.email === email);

    if (!foundPlayer) {
      throw new NotFoundException('Player not found');
    }

    return foundPlayer;
  }

  public async deletePlayer(email: string): Promise<void> {
    this.delete(email);
    return;
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

  private delete(email: string): void {
    const index = this.players.findIndex((player) => player.email === email);
    this.players.splice(index);
  }
}
