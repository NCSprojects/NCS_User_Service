import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('USERS')
export class UserEntity {
  @PrimaryColumn('varchar', { name: 'USER_ID', length: 6 })
  id: string;

  @Column('boolean', { name: 'PRE_REV' })
  preRev: boolean; // 예약을 미리했나

  @Column({ name: 'AD_COUNT' })
  adCnt: number;

  @Column({ name: 'CD_COUNT' })
  cdCnt: number;

  @Column('datetime', { name: 'REG_DT' })
  regDt: Date;

  @Column('boolean', { name: 'MANU_YN' })
  manuYn: boolean;
}
