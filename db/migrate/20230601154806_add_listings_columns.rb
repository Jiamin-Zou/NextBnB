class AddListingsColumns < ActiveRecord::Migration[7.0]
  def change
    add_column  :listings, :category, :string, null: false
    add_column  :listings, :has_wifi, :boolean, null:false, default: false
    add_column  :listings, :has_pets, :boolean, null:false, default: false
    add_column  :listings, :has_kitchen, :boolean, null:false, default: false
    add_column  :listings, :has_ac, :boolean, null:false, default: false
    add_column  :listings, :has_heat, :boolean, null:false, default: false
    add_column  :listings, :has_tv, :boolean, null:false, default: false
    add_column  :listings, :has_parking, :boolean, null:false, default: false
    add_column  :listings, :has_fireplace, :boolean, null:false, default: false

  end
end
