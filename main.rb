require 'sinatra'
require 'socket'
require 'json'
# set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
  erb :index
end

get '/data' do
	s = TCPSocket.new '82.117.171.124', 9099

	line = s.gets # Read lines from socket
	# puts line         # and print them
	
	# s.close
	# content_type :json
	# arr = JSON.parse(line)
	# arr.to_json
end	