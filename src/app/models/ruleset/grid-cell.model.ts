export class GridCell {

  /**
   * Column name
   */
  columnName: string | undefined;
  /**
    * cell value
    */
  value?: string | undefined;
  /**
    * cell source 
    */
  source?: 'vocabualary' | 'value' | undefined;
  /**
   * column type if vocabulary type table
   */
  type?: 'text' | 'number' | 'date' | 'boolean';
  /**
   * A flag that is used to style the text.
   */
  bold?: boolean;
  /**
   * A flag that is used to style the text.
   */
  italic?: boolean;

  /**
   * A flag that is used to style the text.
   */
  underline?: boolean;

  /**
   * A flag that is used to style the text.
   */
  color?: string;
}