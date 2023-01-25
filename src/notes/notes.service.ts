import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dtos';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repo: Repository<Note>) {}

  createNote(data: CreateNoteDto) {
    const note = this.repo.create(data);

    return this.repo.save(note);
  }

  findNote(id: number) {
    if (!id) return null;

    const note = this.repo.findOneBy({ id });
    return note;
  }

  getAllNotes() {
    return this.repo.find();
  }

  async updateNote(id: number, attrs: Partial<Note>) {
    const note = await this.findNote(id);

    if (!note) throw new Error('Note not found');

    Object.assign(note, attrs);

    return this.repo.save(note);
  }

  async deleteNote(id: number) {
    const note = await this.findNote(id);

    if (!note) {
      throw new Error('Note note found');
    }

    return this.repo.remove(note);
  }
}
