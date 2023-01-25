import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateNoteDto, UpdateNoteDto } from './dtos';
import { NotesService } from './notes.service';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post('/new')
  createNote(@Body() body: CreateNoteDto) {
    return this.noteService.createNote(body);
  }

  @Get('/all')
  getAllNotes() {
    return this.noteService.getAllNotes();
  }

  @Patch('/:id')
  updateNote(@Param('id') id: number, @Body() body: UpdateNoteDto) {
    return this.noteService.updateNote(id, body);
  }

  @Get('/:id')
  findNote(@Param('id') id: number) {
    return this.noteService.findNote(id);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: number) {
    return this.noteService.deleteNote(id);
  }
}
