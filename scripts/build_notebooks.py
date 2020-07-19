import binascii
import click
import nbformat
from nbconvert import MarkdownExporter
from nbconvert import PythonExporter
from nbconvert.preprocessors import ExtractOutputPreprocessor
import pathlib
from traitlets.config import Config


def convert_notebook(name, notebook, output_dir):
  c = Config()
  c.ExtractOutputPreprocessor.output_filename_template = name + '/{unique_key}_{cell_index}_{index}{extension}'
  md_exporter = MarkdownExporter(config=c)
  py_exporter = PythonExporter()
  (body, _) = py_exporter.from_notebook_node(notebook)
  with open(output_dir / f'{name}.py', 'w') as fp:
    fp.write(body)
  (body, resources) = md_exporter.from_notebook_node(notebook)
  with open(output_dir / f'{name}.md', 'w') as fp:
    fp.write(body)
  for resource, value in resources['outputs'].items():
    resource_path = output_dir / resource
    resource_path.parent.mkdir(exist_ok=True, parents=True)
    with open(resource_path, 'wb') as fp:
      fp.write(value)


@click.command()
@click.argument('notebook_directory')
@click.argument('output_directory')
def main(notebook_directory, output_directory):
  notebook_directory = pathlib.Path(notebook_directory)
  output_directory = pathlib.Path(output_directory)
  for notebook_path in notebook_directory.glob('*.ipynb'):
    with open(notebook_path, 'r') as fp:
      notebook = nbformat.reads(fp.read(), as_version=4)
    convert_notebook(notebook_path.stem, notebook, output_directory)
  #notebook = nbformat.reads(response, as_version=4)
# Instantiate it
#markdown_exporter = MarkdownExporter()
# Convert the notebook to RST format
#(body, resources) = .from_notebook_node(jake_notebook)
ilf __name__ == '__main__':
  main()
