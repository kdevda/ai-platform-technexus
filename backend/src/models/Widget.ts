import { Schema, model, Document, Types, SchemaDefinition } from 'mongoose';

// Widget settings interfaces
interface TableFieldConfig {
  fieldId: string;
  fieldName: string;
  position: string;
  viewType: 'condensed' | 'detailed';
}

interface TableWidgetSettings {
  tableId: string;
  tableName: string;
  fields: TableFieldConfig[];
  defaultView: 'condensed' | 'detailed';
}

interface FieldWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  displayOptions: {
    showLabel: boolean;
    labelPosition: 'top' | 'left';
    emphasize: boolean;
  };
}

interface FlowStage {
  value: string;
  label: string;
  color: string;
}

interface FlowWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  stages: FlowStage[];
}

interface ProgressThreshold {
  value: number;
  color: string;
}

interface ProgressWidgetSettings {
  tableId: string;
  tableName: string;
  fieldId: string;
  fieldName: string;
  minValue: number;
  maxValue: number;
  thresholds: ProgressThreshold[];
}

interface WidgetSettings {
  table?: TableWidgetSettings;
  field?: FieldWidgetSettings;
  flow?: FlowWidgetSettings;
  progress?: ProgressWidgetSettings;
}

// Base widget interface
export type WidgetType = 'table' | 'field' | 'flow' | 'progress';

export interface IWidget {
  name: string;
  type: WidgetType;
  description?: string;
  collectionName?: string; // renamed to avoid conflict with Document.collection
  settings: WidgetSettings;
  createdBy: string; // Changed from Types.ObjectId to string to support UUID format
  createdAt: Date;
  updatedAt: Date;
}

// Document interface
export type IWidgetDocument = Document & IWidget;

// Widget schema definition
const schemaDefinition: SchemaDefinition<IWidget> = {
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: ['table', 'field', 'flow', 'progress'] },
  description: { type: String, trim: true },
  collectionName: { type: String, trim: true }, // renamed field
  settings: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: String, required: true } // Changed from ObjectId to String to support UUID format
};

// Widget schema
const widgetSchema = new Schema<IWidgetDocument>(schemaDefinition, {
  timestamps: true
});

// Indexes
widgetSchema.index({ name: 1 });
widgetSchema.index({ type: 1 });
widgetSchema.index({ createdBy: 1 });
widgetSchema.index({ collectionName: 1, type: 1 }); // updated index

// Export the model
export const Widget = model<IWidgetDocument>('Widget', widgetSchema); 