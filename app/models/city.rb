# == Schema Information
#
# Table name: cities
#
#  id             :integer          not null, primary key
#  name           :string(255)
#  province_id    :integer
#  created_at     :datetime
#  updated_at     :datetime
#  raja_ongkir_id :integer
#

class City < ActiveRecord::Base

  belongs_to :province

end
