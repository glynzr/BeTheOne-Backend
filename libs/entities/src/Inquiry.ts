import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';

@Entity()
export class Inquiry extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'requested_item' })
    requestedItem: string;

    @Column()
    description: string;

    @Column()
    quantity: number;

    @Column({ name: 'amount_identifier' })
    amountIdentifier: string;
}

@AuditingEntity(Inquiry)
export class InquiryAudit
    extends Inquiry
    implements AuditingEntityDefaultColumns
{
    _seq: number;
    _action: AuditingAction;
    _modifiedAt: Date;
}
