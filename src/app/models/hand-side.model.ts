export class HandSide {
 /**
     * Vocabulary indentifier
     */
  id?: string;
  /**
   * Vocabulary value
   */
  value?: string;
  /**
   * Vocabulary value
   */
  source?: string;

  /**
   * icon not to save 
   * for display only
   */
  icon?:string;

  /**
   * Handside type 
   * for frontend only
   */
   type!: 'text' | 'number' | 'boolean' | 'range' | 'table' | 'date';

  constructor(){
  }
}