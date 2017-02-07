ara = ['Аккамулятор №1', 'Больница №1', 'Ветрогенератор №1', 'Ветрогенератор №2', 'Госпиталь №3', 'Госпиталь №6', 'Завод "Красный трактор"', 'Микрорайон "№13"', 'Микрорайон "№9"', 'Миниподстанция №2', 'Подстанция №1', 'Солнечная батарея №1', 'Солнечная батарея №2']
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
    "<a href=\"#\" data-toggle=\"modal\" data-target=\"#" + key + "\">" + value + "</a>"
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