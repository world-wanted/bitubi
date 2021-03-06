# == Schema Information
#
# Table name: suppliers
#
#  id                        :integer          not null, primary key
#  address                   :string(255)
#  bank_account_number       :string(255)
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  name                      :string(255)
#  image_file_name           :string(255)
#  image_content_type        :string(255)
#  image_file_size           :integer
#  image_updated_at          :datetime
#  description               :text(65535)
#  banner_image_file_name    :string(255)
#  banner_image_content_type :string(255)
#  banner_image_file_size    :integer
#  banner_image_updated_at   :datetime
#  bank_account_name         :string(255)
#  bank_name                 :string(255)
#  city_id                   :integer
#

class Supplier < ActiveRecord::Base

  has_one :user
  belongs_to :city

  has_attached_file :image, styles: {
    medium: '300x300>',
    thumb: '100x100>'
  }
  validates_attachment_content_type :image, content_type: ['image/jpeg', 'image/gif', 'image/png']

  has_attached_file :banner_image, styles: {
    medium: '300x300>',
    thumb: '100x100>'
  }
  validates_attachment_content_type :banner_image, content_type: ['image/jpeg', 'image/gif', 'image/png']

  def self.bank_list
    [
      'Bank Central Asia',
      'Bank Mandiri',
      'Bank Rakyat Indonesia'
    ]
  end

end
