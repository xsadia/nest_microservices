import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  public async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDTO);
    return;
  }

  @Get()
  public async getAllPlayers(): Promise<Array<Player>> {
    return await this.playersService.findAll();
  }

  @Get(':email')
  public async getPlayer(@Param('email') email: string): Promise<Player> {
    return await this.playersService.findByEmail(email);
  }

  @Delete(':email')
  public async deletePlayer(@Param('emaik') email: string): Promise<void> {
    await this.playersService.deletePlayer(email);
    return;
  }
}
