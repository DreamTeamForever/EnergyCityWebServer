ara = ['Фабрика #1', 'Фабрика #2', 'Электрический аккумулятор #1', 'Электрический аккумулятор #2', 'Электрический аккумулятор #3', 'Госпиталь #1', 'Госпиталь #2', 'Микрорайон #1', 'Микрорайон #2', 'Микрорайон #3', 'Микрорайон #4', 'Микрорайон #5', 'Микрорайон #6', 'Дизель генератор #1', 'Дизель генератор #2', 'Дизель генератор #3', 'Ветрогенератор', 'Солнечная батарея', 'Электрическая станция', 'Электрическая подстанция']
def in_to_template(key, value)
    "<div id=\"" + key + "\" class=\"modal fade\" role=\"dialog\">" + "\n" + \
    "  <div class=\"modal-dialog\">" + "\n" + \
    "    <!-- Modal content-->" + "\n" + \
    "    <div class=\"modal-content\">" + "\n" + \
    "      <div class=\"modal-header\">" + "\n" + \
    "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" + "\n" + \
    "        <h4 class=\"modal-title\">Реадктирование обьекта \'" + value + "\'</h4>" + "\n" + \
    "      </div>" + "\n" + \
    "      <div class=\"modal-body\">" + "\n" + \
    "        <p>Реадктирование обьекта \'" + value + "\'</p>" + "\n" + \
    "      </div>" + "\n" + \
    "      <div class=\"modal-footer\">" + "\n" + \
    "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Закрыть</button>" + "\n" + \
    "      </div>" + "\n" + \
    "    </div>" + "\n" + \
    "  </div>" + "\n" + \
    "</div>"
end

def button_template(key, value)
    " <li>" + "\n" + \
    "   <a href=\"#\" data-toggle=\"modal\" data-target=\"#" + key + "\">" + value + "</a>" + "\n" + \
    " </li>"
end


key = []
ara.each { |e| key.push((0...8).map { (65 + rand(26)).chr }.join) }
data = Hash[key.zip(ara)]

data.each do |key, value|
    puts in_to_template(key, value)
end
data.each do |key, value|
    puts button_template(key, value)
end