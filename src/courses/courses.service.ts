import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>
    ) {}

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: string) {
    const course = this.coursesRepository.findOne(id);
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    } else {
      return course;
    }
  }

  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCoursesDto) {
    const course = await this.coursesRepository.preload({
      id: +id,
      ... updateCourseDto
    });
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    } else {
      return this.coursesRepository.save(course);
    }
  }

  async remove(id: string) {
    const course = await this.coursesRepository.findOne(id);
    if(!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    } else {
      return this.coursesRepository.remove(course);
    }
  }
}
