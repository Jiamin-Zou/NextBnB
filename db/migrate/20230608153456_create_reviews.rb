class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :listing, null: false, index: true, foreign_key: true
      t.references :reviewer, null: false,index: true, foreign_key: { to_table: :users }
      t.integer :cleanliness, null: false
      t.integer :accuracy, null: false
      t.integer :value, null: false
      t.integer :communication, null: false
      t.integer :check_in, null: false
      t.integer :location, null: false
      t.float :overall_rating, null: false
      t.text :body

      t.timestamps
    end
  end
end
