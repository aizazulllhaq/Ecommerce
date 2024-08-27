int i, temp, j, a[], n;

for (i = n; i > 0; i--)
{
    for (j = 0; j < i - 1; j++)
    {
        if (a[j] > a[j + 1])
        {
            temp = a[j];
            a[j] = a[j + 1];
            a[j + 1] = temp;
        }
    }
}
// sorted array
for (i = 0; i < n; ++i)
{
    printf(a[i])
}

