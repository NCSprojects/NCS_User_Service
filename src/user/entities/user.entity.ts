import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('boolean')
  preRev: boolean; // 예약을 미리했나
  @Column()
  adCnt: number;
  @Column()
  cdCnt: number;
  @Column('datetime')
  regDt: Date;
}
