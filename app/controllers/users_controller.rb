# Controller to show user data things
class UsersController < ApplicationController

  before_action :authenticate_user!

  def topup_credit
    @top_up = TopUp.new(top_up_params)
    @top_up.user = current_user
    if @top_up.save
      flash[:success] = 'Berhasil isi saldo! Saldo Anda akan bertambah setelah kami verifikasi.'
      redirect_to saldo_path
    else
      render action: :topup
    end
  end

  def account
    @user = current_user
  end

  def topup
    @top_up = TopUp.new
  end

  def orders
    @orders = current_user.orders
  end

  def order
    @order = current_user.orders.find(params[:id])
  end

  def products
    @products = current_user.products
  end

  def new_product
    @product = Product.new
  end

  def edit_product
    @product = Product.find(params[:id])
  end

  def sell
    @line_items = LineItem.includes({ order: [{ address: [{ state: [{ city: :province }] }] }, :state_shipment_price, :user] }, :product)
                  .joins(:product, :order)
                  .where('products.user_id = ?', current_user.id)
                  .where('orders.state = ?', :done)
  end

  private

  def top_up_params
    params.require(:top_up).permit(:name, :amount, :bank)
  end

end
