import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';

import { initDataDB } from '../constanst/rol';
import { role } from '../../entities/role';

@Injectable()
export class RolInitDbService {

    data: any = initDataDB

    constructor(
      @InjectRepository(role)
      private readonly rolRepository: Repository<role>
    ) {}

    async default(){
      this.data.forEach(async item => {
        const isExist = await this.rolRepository.find({ where: { name: item.name } })
        
        if(isExist.length == 0) this.rolRepository.save(item)
      });
    }
}
