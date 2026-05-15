/**
 * TypeScript types for API responses and requests
 */

// Base types
export interface DocumentFile {
  id: number;
  filename: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
}

export interface AnalysisRisk {
  id: number;
  analysis_id: number;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  mitigation?: string;
  identified_at: string;
}

export interface DocumentAnalysis {
  id: number;
  document_id: number;
  summary: string;
  full_analysis?: string;
  analyzed_at: string;
  status: 'pending' | 'completed' | 'failed';
  risks: AnalysisRisk[];
  error_message?: string;
}

export interface DocumentWithAnalysis extends DocumentFile {
  latest_analysis?: DocumentAnalysis;
}

// API Response types
export interface FileUploadResponse {
  success: boolean;
  message: string;
  file_id: number;
  filename: string;
  file_size: number;
}

export interface AnalysisResponse {
  id: number;
  document_id: number;
  summary: string;
  analyzed_at: string;
  status: string;
  risks: AnalysisRisk[];
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// Request types
export interface UploadDocumentRequest {
  file: File;
}

export interface AnalyzeDocumentRequest {
  file_id: number;
}

// Health check types
export interface HealthCheckResponse {
  status: string;
  message: string;
}

export interface DatabaseHealthResponse extends HealthCheckResponse {
  database: string;
}

export interface ApiStatusResponse {
  api_version: string;
  status: string;
  database: string;
  services: {
    groq_ai: string;
    file_upload: string;
  };
}

// List response types
export interface AnalysisListResponse {
  total: number;
  page: number;
  page_size: number;
  items: DocumentAnalysis[];
}

// Hook return types
export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}
