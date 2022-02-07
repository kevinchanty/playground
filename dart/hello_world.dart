import 'dart:io';

main() async {
  print('Hello, World!');
  getEnvInfo();
}

writeFile() async {
  final quotes = File('quotes.txt');
  const stronger = 'That which does not kill you';

  await quotes.writeAsString(stronger, mode: FileMode.append);
}

getEnvInfo() {
  final envVarMap = Platform.environment;

  print(Platform.isMacOS);
  print(Platform.script);

  print('PWD = ${envVarMap['PWD']}');
  print('LOGNAME = ${envVarMap['LOGNAME']}');
  print('PATH = ${envVarMap['PATH']}');
}
