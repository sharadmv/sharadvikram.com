import numpy as np

def generate(params):
    a = params.get('a', 1)
    b = params.get('b', 1)
    size = params.get('size', 1)
    return np.random.beta(a, b, size=size)
