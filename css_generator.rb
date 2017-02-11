ara = ['factory', 'accumulate', 'hospital', 'district', 'diesel_power', 'wind_power', 'sun_power', 'electric_substaion', 'mini_electric_substaion', 'stick']

# def print_template(str)
# template = '{' + "\n" \
# '	selector: \'#' + str + '\',' + "\n" \
# '	style: {' + "\n" \
# '	  \'background-image\': \'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg\',' + "\n" \
# '	}' + "\n" \
# '},'	
# end

# ara.each { |e| puts print_template(e) }

# ara = {'factory': 2, 'accumulate':3, 'hospital': 2, 'district': 6, 'diesel_power': 3, 'wind_power':1, 'sun_power':1, 'electric_substaion':1, 'mini_electric_substaion':1, 'stick':6}

# ara.each do |key,value|  

# 	for i in 0..value-1 do 
# 		puts "{ data: { id: '#{key.to_s + '_' + i.to_s}', label: '#{key.to_s}' } }," 
# 	end
# end

# count_i = 1 
# ara.each { |k, v|
# 	for i in 0..(v-1) do
# 		ara.each { |key, value|
# 			source = k.to_s + '_' + i.to_s
# 			target = key.to_s + '_' + i.to_s

# 			puts "{ data: { id: '#{source + '_' + target}', weight: #{count_i.to_s}, color: '#74E883',  source: '#{source}', target: '#{target}' } }," if source != target
# 			count_i += 1  if source != target
# 		}
# 	end
# }



def print_template(str)
      "{" + "\n" \
      "  selector: \'node[type = \"#{str}\"]\',"  + "\n" \
      "  style: {"  + "\n" \
      "          'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',"  + "\n" \
      "  }"  + "\n" \
      "},"
end

ara.each { |e| puts print_template(e) }