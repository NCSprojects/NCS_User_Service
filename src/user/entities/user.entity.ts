import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('USERS')
export class UserEntity {
  @PrimaryColumn('varchar', { length: 6 })
  id: string;
  @Column('boolean')
  preRev: boolean; // 예약을 미리했나
  @Column()
  adCnt: number;
  @Column()
  cdCnt: number;
  @Column('datetime')
  regDt: Date;
}
