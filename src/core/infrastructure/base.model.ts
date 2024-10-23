import { Column } from "typeorm";

export class BaseModel {
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP"})
  updated_at: Date;

  @Column({type: "timestamp", nullable: true})
  deleted_at: Date;
}