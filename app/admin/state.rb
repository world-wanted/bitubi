ActiveAdmin.register State do

  actions :all, except: [:destroy]

  permit_params :name, :city_id

  index do
    selectable_column
    id_column
    column :name
    column :city
    column :raja_ongkir_id
    actions
  end

  filter :name

  form do |f|
    f.inputs 'Admin Details' do
      f.input :name
      f.input :city
      f.input :raja_ongkir_id
    end
    f.actions
  end

end
