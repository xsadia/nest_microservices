import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/createPlayer.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  public async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    const { email } = createPlayerDTO;
    return JSON.stringify({
      email,
    });
  }
}
