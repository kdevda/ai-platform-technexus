import mongoose, { Document, Schema } from 'mongoose';

// Widget position in a layout
interface WidgetPosition {
  id: string;
  widgetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  section: 'header' | 'left' | 'middle' | 'right';
  position?: string;
}

// Layout document interface
export interface ILayout extends Document {
  name: string;
  tableId: string;
  tableName: string;
  description?: string;
  widgets: WidgetPosition[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Widget position schema
const widgetPositionSchema = new Schema({
  id: { type: String, required: true },
  widgetId: { type: String, required: true },
  x: { type: Number, required: true, default: 0 },
  y: { type: Number, required: true, default: 0 },
  width: { type: Number, required: true, default: 1 },
  height: { type: Number, required: true, default: 1 },
  section: { 
    type: String, 
    required: true, 
    enum: ['header', 'left', 'middle', 'right'] 
  },
  position: { type: String }
});

// Layout schema
const layoutSchema = new Schema(
  {
    name: { type: String, required: true },
    tableId: { type: String, required: true },
    tableName: { type: String, required: true },
    description: { type: String },
    widgets: [widgetPositionSchema],
    isDefault: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

// Create indexes for faster queries
layoutSchema.index({ tableId: 1, isDefault: -1 });
layoutSchema.index({ updatedAt: -1 });

export const LayoutModel = mongoose.model<ILayout>('Layout', layoutSchema); 