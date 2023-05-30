json.user do
    json.extract! @user, :id, :email, :last_name, :first_name
end