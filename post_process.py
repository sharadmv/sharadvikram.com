import ast
import sys

counter = 0
record = []
recording = False
for line in sys.stdin:
  if line == '```\n':
    counter += 1
    if counter % 2 == 0:
      code = ''.join(record)
      try:
        ast.parse(code)
        sys.stdout.write('```python\n')
      except SyntaxError:
        sys.stdout.write('```\n')
      sys.stdout.write(code)
      sys.stdout.write('```\n')
      record = []
      recording = False
    else:
      recording = True
  elif recording:
    record.append(line)
  else:
    sys.stdout.write(line)
