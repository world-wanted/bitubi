class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :products

  def self.roles
    [
      ['Admin', 'admin'],
      ['User', 'user'],
      ['Supplier', 'supplier']
    ]
  end

end
