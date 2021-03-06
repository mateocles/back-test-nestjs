import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { initDataDB } from '../constanst/permission';
import { permission } from '../../entities/permission';

@Injectable()
export class PermissionInitDbService {

    data: any = initDataDB

    constructor(
      @InjectRepository(permission)
      private readonly permissionRepository: Repository<permission>
    ) {}

    async default(){
      this.data.forEach(async item => {
        const isExist = await this.permissionRepository.findOne({ where: { id: item.id } })

        if(!isExist) this.permissionRepository.save(item)
      });
    }
}
