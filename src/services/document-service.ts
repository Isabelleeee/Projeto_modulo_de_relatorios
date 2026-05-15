/**
 * Document service - handles all document-related API calls
 */
import { apiClient } from './api-client';
import type {
  DocumentFile,
  DocumentAnalysis,
  DocumentWithAnalysis,
  FileUploadResponse,
  AnalysisResponse,
  AnalysisListResponse,
} from '../types/api';

export class DocumentService {
  /**
   * Upload a document file
   */
  static async uploadDocument(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post<FileUploadResponse>('/api/documents/upload', formData);
  }

  /**
   * Analyze a previously uploaded document
   */
  static async analyzeDocument(fileId: number): Promise<AnalysisResponse> {
    return apiClient.post<AnalysisResponse>(`/api/documents/analyze/${fileId}`);
  }

  /**
   * Get document details with latest analysis
   */
  static async getDocument(fileId: number): Promise<DocumentWithAnalysis> {
    return apiClient.get<DocumentWithAnalysis>(`/api/documents/${fileId}`);
  }

  /**
   * List all documents with pagination
   */
  static async listDocuments(
    page: number = 1,
    pageSize: number = 10
  ): Promise<AnalysisListResponse> {
    return apiClient.get<AnalysisListResponse>(
      `/api/documents?page=${page}&page_size=${pageSize}`
    );
  }

  /**
   * Delete a document and its analyses
   */
  static async deleteDocument(fileId: number): Promise<{ success: boolean; message: string }> {
    return apiClient.delete(`/api/documents/${fileId}`);
  }

  /**
   * Legacy method for backward compatibility
   * Combines upload and analyze in one call
   */
  static async uploadAndAnalyze(file: File): Promise<{
    upload: FileUploadResponse;
    analysis: AnalysisResponse;
  }> {
    // Upload first
    const uploadResponse = await this.uploadDocument(file);

    if (!uploadResponse.success) {
      throw new Error(uploadResponse.message || 'Upload failed');
    }

    // Then analyze
    const analysisResponse = await this.analyzeDocument(uploadResponse.file_id);

    return {
      upload: uploadResponse,
      analysis: analysisResponse,
    };
  }

  static async downloadReport(
    fileId: number,
    format: 'markdown' | 'pdf' | 'docx'
  ): Promise<{ blob: Blob; filename: string }> {
    const endpoint = `/api/documents/${fileId}/download/${format}`;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      throw new Error(`Failed to download report: ${text}`);
    }

    const blob = await response.blob();
    const filename = `relatorio_${fileId}.${format === 'markdown' ? 'md' : format}`;
    return { blob, filename };
  }
}

// Export singleton instance
export const documentService = DocumentService;
